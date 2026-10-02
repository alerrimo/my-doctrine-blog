// Inizializzazione del client Supabase
const SUPABASE_URL = 'https://dlgpvykubqwkryaltwpm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsZ3B2eWt1YnF3a3J5YWx0d3BtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4NzExMzMsImV4cCI6MjEwNjQ0NzEzM30.UNFpiC43z7bj_eaow2z9mmTEuWvM-OvNI6jRPy4cSTg';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const db = {
    async getArticoli() {
        try {
            const { data, error } = await supabaseClient.from('posts').select('*').order('created_at', { ascending: false });
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Errore recupero articoli da Supabase:', error.message);
            return [];
        }
    },

    async salvaArticolo(articolo) {
        try {
            const { data, error } = await supabaseClient.from('posts').upsert([articolo]).select();
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Errore salvataggio articolo:', error.message);
            throw error;
        }
    },

    async eliminaArticolo(id) {
        try {
            const { error } = await supabaseClient.from('posts').delete().eq('id', id);
            if (error) throw error;
        } catch (error) {
            console.error('Errore eliminazione articolo:', error.message);
        }
    },

    async getFonti() {
        try {
            const { data, error } = await supabaseClient.from('sources').select('*');
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Errore recupero fonti:', error.message);
            return [];
        }
    },

    async salvaFonte(fonte) {
        try {
            const { data, error } = await supabaseClient.from('sources').upsert([fonte]).select();
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Errore salvataggio fonte:', error.message);
            throw error;
        }
    },

    async eliminaFonte(id) {
        try {
            const { error } = await supabaseClient.from('sources').delete().eq('id', id);
            if (error) throw error;
        } catch (error) {
            console.error('Errore eliminazione fonte:', error.message);
        }
    },

    async getCommenti(postId) {
        try {
            const { data, error } = await supabaseClient.from('comments').select('*').eq('post_id', postId);
            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Errore recupero commenti:', error.message);
            return [];
        }
    },

    async aggiungiCommento(commento) {
        try {
            const { data, error } = await supabaseClient.from('comments').insert([commento]).select();
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Errore aggiunta commento:', error.message);
        }
    }
};