import { signInWithGoogle } from "@/firebase/firebase"

export const hangleContinueWithGoogle =  async()=>{
    try {
        const firebase_user =  await signInWithGoogle();
        console.log(firebase_user);
    } catch (error:any) {
        console.log("failed to sign in",error);
    }
}
