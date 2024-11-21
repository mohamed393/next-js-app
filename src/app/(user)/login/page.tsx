import LoginForm from "@/app/(user)/login/loginForm";
// import {cookies} from "next/headers";
// import {redirect} from "next/navigation";

const LoginPage = () => {
    // const token = cookies().get("jwtToken")?.value;
    // if (token) redirect("/");
  return (
    <section className='container m-auto px-7 flex items-center justify-center w-full absolute h-3/4'>
      <div className='m-auto bg-white rounded-lg p-5 w-full md:w-2/3'>
          <h1 className='text-3xl font-bold text-gray-800 mb-5'>Log In</h1>
          <LoginForm/>
      </div>

    </section>
  )
}

export default LoginPage
