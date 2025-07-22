import { supabase } from './supabaseApi';

interface Props{
    email: string;
    password: string;
}

async function signInWithEmail(email: string, password: string) {
    try {
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) alert(error.message);
    } catch (error) {
        return console.error(error)
    }
}

async function recoverPasswordWithEmail({email}: Props) {
    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);

        if (error) alert(error.message);
        return data;
    } catch (error) {
        return console.error(error)
    }
}

async function updateUser({email, password}: Props) {
    try {
        const { data, error } = await supabase.auth.updateUser({
            email: email,
            password: password,
            data: {message: 'updated password because of i forgot my password'}
        });

        if (error) alert(error.message);
        return data;
    } catch (error) {
        return console.error(error)
    }
}

async function signUpWithEmail(email: string, password: string) {
    try{
        const {
        data: { session },
        error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) alert(error.message)
        if (!session) alert('Please check your inbox for email verification!')

    }catch(err){
        return console.error(err);
    }
}

async function signOut(){
    try {
        const { error } = await supabase
        .auth
        .signOut();
        if (error) {
            alert('Failed to sign out' + error);
        }
    } catch (error) {
        return console.error(error);
    }
}

export {signInWithEmail, signUpWithEmail, signOut};