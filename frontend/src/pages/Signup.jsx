import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth, db } from '../components/firebase';
import { setDoc, doc } from 'firebase/firestore';
import Button from '../components/Button';
import toast from 'react-hot-toast';
const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // Create a new user with email and password
            await createUserWithEmailAndPassword(auth, email, password)
            const user = auth.currentUser;

            if (!user) {
                console.error("No user is currently signed in.");
                return;
            }
            // Create a document in Firestore with the user's UID
            if (user) {
                await setDoc(doc(db, "users", user.uid), {
                    firstName: fname,
                    lastName: lname,
                    email: email,
                    uid: user.uid
                });
            }
            // Log the user object
            console.log('User created:', user);
            toast.success("User registered successfully");
            window.location.href = '/login';
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className='p-5 rounded-lg shadow-md max-w-md mx-auto mt-10'>
            <form className="space-y-4" onSubmit={handleRegister}>
                <h3>Sign Up</h3>

                <div className="mb-3">
                    <label htmlFor="title" className="block font-medium mb-1">First name</label>
                    <input
                        type="text"
                        className="form-control w-full my-4 border-b p-2"
                        placeholder="First name"
                        onChange={(e) => setFname(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="block font-medium mb-1">Last name</label>
                    <input
                        type="text"
                        className="form-control w-full my-4 border-b p-2"
                        placeholder="Last name"
                        onChange={(e) => setLname(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="block font-medium mb-1">Email address</label>
                    <input
                        type="email"
                        className="form-control w-full my-4 border-b p-2"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="block font-medium mb-1">Password</label>
                    <input
                        type="password"
                        className="form-control w-full my-4 border-b p-2"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='w-full flex justify-center items-center my-4'>
                    <Button type="submit" className="bg-[#00ADB5] rounded-md text-white text-center mx-auto cursor-pointer w-28">
                        Sign Up
                    </Button>
                </div>
                <p className="forgot-password text-right">
                    Already registered <a href="/login">Login</a>
                </p>
            </form>
        </div>
    )
}

export default Signup