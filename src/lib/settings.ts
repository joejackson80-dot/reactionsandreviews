import { supabase } from './supabase';

export async function getSetting<T>(key: string, defaultValue: T): Promise<T> {
    try {
        const { data, error } = await supabase
            .from('site_settings')
            .select('value')
            .eq('key', key)
            .single();

        if (error || !data) {
            return defaultValue;
        }

        return data.value as T;
    } catch (err) {
        console.error(`Error fetching setting ${key}:`, err);
        return defaultValue;
    }
}

export async function updateSetting(key: string, value: unknown): Promise<boolean> {
    try {
        const { error } = await supabase
            .from('site_settings')
            .upsert({ key, value, updated_at: new Date().toISOString() });

        if (error) {
            throw error;
        }

        return true;
    } catch (err) {
        console.error(`Error updating setting ${key}:`, err);
        return false;
    }
}
