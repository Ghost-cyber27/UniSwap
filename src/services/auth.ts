import { supabase } from './supabaseApi';

interface Props{
    email: string;
    password: string;
}

async function signInWithEmail({email, password}: Props) {
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

async function signUpWithEmail({email, password}: Props) {
    const {
        data: { session },
        error,
    } = await supabase.auth.signUp({
        email: email,
        password: password,
    })

    if (error) alert(error.message)
    if (!session) alert('Please check your inbox for email verification!')
}

async function signOut(){
    const { error } = await supabase
    .auth
    .signOut();
    if (error) {
        alert('Failed to sign out' + error);
    }
}

export {signInWithEmail, signUpWithEmail, signOut};