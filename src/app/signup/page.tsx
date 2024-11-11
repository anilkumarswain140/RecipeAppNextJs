import dynamic from 'next/dynamic';

// Enable SSR (default behavior) for the component
const SignUpForm = dynamic(() => import('../components/Signup/SignupForm'));
// Default is ssr: true

export default function SignupPage() {
  return (
    <>
      <SignUpForm />
    </>
  );
}