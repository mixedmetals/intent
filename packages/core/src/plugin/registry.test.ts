import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  PluginManager,
  usePlugin,
  hasPlugin,
  getPluginManager,
  resetPluginManager,
} from './registry.js';
import { defineComponent, prop } from '../schema/define.js';
import type { IntentPlugin } from './types.js';

describe('PluginManager', () => {
  let manager: PluginManager;
  
  beforeEach(() => {
    manager = new PluginManager();
  });
  
  describe('register', () => {
    it('should register a plugin', () => {
      const plugin: IntentPlugin = {
        name: 'test-plugin',
        version: '1.0.0',
      };
      
      manager.register(plugin);
      
      expect(manager.has('test-plugin')).toBe(true);
    });
    
    it('should throw if plugin is already registered', () => {
      const plugin: IntentPlugin = {
        name: 'test-plugin',
        version: '1.0.0',
      };
      
      manager.register(plugin);
      
      expect(() => manager.register(plugin)).toThrow('Plugin "test-plugin" is already registered');
    });
    
    it('should merge options with defaults', () => {
      const plugin: IntentPlugin = {
        name: 'test-plugin',
        version: '1.0.0',
        defaultOptions: { foo: 'default', bar: 42 },
      };
      
      manager.register(plugin, { bar: 100 });
      
      const registration = manager['registry'].plugins.get('test-plugin');
      expect(registration?.options).toEqual({ foo: 'default', bar: 100 });
    });
    
    it('should register plugin components', () => {
      const TestComponent = defineComponent({
        name: 'Test',
        properties: {
          variant: prop.enum(['a', 'b']),
        },
        constraints: [],
        mappings: {},
      });
      
      const plugin: IntentPlugin = {
        name: 'test-plugin',
        version: '1.0.0',
        components: { Test: TestComponent },
      };
      
      manager.register(plugin);
      
      expect(manager.getComponents().has('Test')).toBe(true);
    });
    
    it('should merge plugin tokens', () => {
      const plugin: IntentPlugin = {
        name: 'test-plugin',
        version: '1.0.0',
        tokens: {
          color: { 'custom-red': '#FF0000' },
        },
      };
      
      manager.register(plugin);
      
      const tokens = manager.getTokens();
      expect(tokens.color?.['custom-red']).toBe('#FF0000');
    });
    
    it('should call setup hook', () => {
      const setup = vi.fn();
      
      const plugin: IntentPlugin = {
        name: 'test-plugin',
        version: '1.0.0',
        setup,
      };
      
      manager.register(plugin);
      
      expect(setup).toHaveBeenCalled();
    });
  });
  
  describe('unregister', () => {
    it('should unregister a plugin', () => {
      const plugin: IntentPlugin = {
        name: 'test-plugin',
        version: '1.0.0',
      };
      
      manager.register(plugin);
      manager.unregister('test-plugin');
      
      expect(manager.has('test-plugin')).toBe(false);
    });
    
    it('should throw if plugin is not registered', () => {
      expect(() => manager.unregister('non-existent')).toThrow('Plugin "non-existent" is not registered');
    });
    
    it('should call teardown hook', () => {
      const teardown = vi.fn();
      
      const plugin: IntentPlugin = {
        name: 'test-plugin',
        version: '1.0.0',
        teardown,
      };
      
      manager.register(plugin);
      manager.unregister('test-plugin');
      
      expect(teardown).toHaveBeenCalled();
    });
    
    it('should remove plugin components', () => {
      const TestComponent = defineComponent({
        name: 'Test',
        properties: {},
        constraints: [],
        mappings: {},
      });
      
      const plugin: IntentPlugin = {
        name: 'test-plugin',
        version: '1.0.0',
        components: { Test: TestComponent },
      };
      
      manager.register(plugin);
      manager.unregister('test-plugin');
      
      expect(manager.getComponents().has('Test')).toBe(false);
    });
  });
  
  describe('enable/disable', () => {
    it('should disable a plugin', () => {
      const plugin: IntentPlugin = {
        name: 'test-plugin',
        version: '1.0.0',
      };
      
      manager.register(plugin);
      manager.disable('test-plugin');
      
      const registration = manager['registry'].plugins.get('test-plugin');
      expect(registration?.enabled).toBe(false);
    });
    
    it('should enable a plugin', () => {
      const plugin: IntentPlugin = {
        name: 'test-plugin',
        version: '1.0.0',
      };
      
      manager.register(plugin);
      manager.disable('test-plugin');
      manager.enable('test-plugin');
      
      const registration = manager['registry'].plugins.get('test-plugin');
      expect(registration?.enabled).toBe(true);
    });
  });
  
  describe('executeHook', () => {
    it('should execute hooks on all enabled plugins', async () => {
      const hook1 = vi.fn((data) => data + '1');
      const hook2 = vi.fn((data) => data + '2');
      
      manager.register({
        name: 'plugin-1',
        version: '1.0.0',
        hooks: { beforeGenerate: hook1 },
      });
      
      manager.register({
        name: 'plugin-2',
        version: '1.0.0',
        hooks: { beforeGenerate: hook2 },
      });
      
      const result = await manager.executeHook('beforeGenerate', 'start', { name: 'test', tokens: {}, components: {} } as any);
      
      expect(hook1).toHaveBeenCalled();
      expect(hook2).toHaveBeenCalled();
      expect(result).toBe('start12');
    });
    
    it('should skip disabled plugins', async () => {
      const hook = vi.fn((data) => data);
      
      manager.register({
        name: 'test-plugin',
        version: '1.0.0',
        hooks: { beforeGenerate: hook },
      });
      
      manager.disable('test-plugin');
      
      await manager.executeHook('beforeGenerate', [], { name: 'test', tokens: {}, components: {} } as any);
      
      expect(hook).not.toHaveBeenCalled();
    });
    
    it('should pass context to hooks', async () => {
      const hook = vi.fn((data, context) => {
        expect(context.config).toBeDefined();
        expect(context.tokens).toBeDefined();
        expect(context.utils).toBeDefined();
        return data;
      });
      
      manager.register({
        name: 'test-plugin',
        version: '1.0.0',
        hooks: { beforeGenerate: hook },
      });
      
      await manager.executeHook('beforeGenerate', [], { name: 'test', tokens: {}, components: {} } as any);
      
      expect(hook).toHaveBeenCalled();
    });
  });
  
  describe('clear', () => {
    it('should clear all plugins', () => {
      manager.register({ name: 'plugin-1', version: '1.0.0' });
      manager.register({ name: 'plugin-2', version: '1.0.0' });
      
      manager.clear();
      
      expect(manager.has('plugin-1')).toBe(false);
      expect(manager.has('plugin-2')).toBe(false);
    });
  });
});

describe('Global Plugin Manager', () => {
  beforeEach(() => {
    resetPluginManager();
  });
  
  afterEach(() => {
    resetPluginManager();
  });
  
  it('should return singleton instance', () => {
    const manager1 = getPluginManager();
    const manager2 = getPluginManager();
    
    expect(manager1).toBe(manager2);
  });
  
  it('usePlugin should register plugin globally', () => {
    const plugin: IntentPlugin = {
      name: 'global-plugin',
      version: '1.0.0',
    };
    
    usePlugin(plugin);
    
    expect(hasPlugin('global-plugin')).toBe(true);
  });
});
