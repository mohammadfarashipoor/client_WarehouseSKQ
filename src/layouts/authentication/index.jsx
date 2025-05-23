function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          {children}

          <div className="hidden md:block">
            <div className="hero min-h-full rounded-l-xl bg-base-200">
              <div className="hero-content py-12">
                <div className="max-w-md">
                  <h1 className="text-3xl text-center font-bold ">
                    <img
                      src="/logo192.png"
                      className="w-12 inline-block ml-2 mask mask-circle"
                      alt="dashwind-logo"
                    />
                    سنگ کاغذ قیچی
                  </h1>

                  <div className="text-center mt-12">
                    <img
                      src="./intro.png"
                      alt="Dashwind Admin Template"
                      className="w-48 inline-block"
                    ></img>
                  </div>

                  <h1 className="text-2xl mt-8 font-bold">
                    Admin Dashboard Starter Kit
                  </h1>
                  <p className="py-2 mt-4">
                    ✓ <span className="font-semibold">Light/dark</span> mode
                    toggle
                  </p>
                  <p className="py-2 ">
                    ✓ <span className="font-semibold">Redux toolkit</span> and
                    other utility libraries configured
                  </p>
                  <p className="py-2 ">
                    ✓ User-friendly
                    <span className="font-semibold">documentation</span>
                  </p>
                  <p className="py-2  mb-4">
                    ✓ <span className="font-semibold">Daisy UI</span>
                    components,
                    <span className="font-semibold">Tailwind CSS</span> support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
