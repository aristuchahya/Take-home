import { Link } from "react-router-dom";

export function GetStarted() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="w-full pt-12 md:pt-24 lg:pt-32">
        <div className="container space-y-10 xl:space-y-16">
          <div className="grid gap-4 px-4 md:px-6 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Mulai dengan Platform Kami
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Coba platform kami untuk mendeteksi stunting
              </p>
              <Link
                to="/login"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 mt-6"
              >
                Mulai Sekarang
              </Link>
            </div>
            <img
              src="https://media.istockphoto.com/id/1330544224/photo/asian-female-pediatrician-doctor-examining-little-cute-smiling-baby-boy-with-stethoscope-in.webp?b=1&s=612x612&w=0&k=20&c=Qr28Vg8udRdySeBzTmRFsvM5BFppPP08Ny7bajlKEVo="
              width="600"
              height="400"
              alt="Hero"
              className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Mulai Deteksi Stunting
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Platform kami membantu mendeteksi stunting.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">
                      Bergabunglah Bersama Kami Mendeteksi Stunting!
                    </h3>
                    <p className="text-muted-foreground">
                      Pertumbuhan anak Anda sangat penting bagi masa depannya.
                      Deteksi dini stunting bisa membuat perbedaan besar. Bantu
                      kami memastikan setiap anak mendapatkan awal yang terbaik
                      dalam hidup. Terlibatlah, periksa pertumbuhan anak Anda
                      secara rutin, dan jadilah bagian dari solusi.
                      Bersama-sama, kita bisa melawan stunting dan membangun
                      masa depan yang lebih sehat untuk anak-anak kita!
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <img
              src="https://media.istockphoto.com/id/1482747050/photo/photo-of-a-doctor-examining-a-little-girl-with-a-stethoscope-in-a-clinic.webp?b=1&s=612x612&w=0&k=20&c=cknNE_1ZNmZUQeCCXb4l9YXb387AoROoGRwTH1McZKU="
              width="550"
              height="310"
              alt="Features"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Ambil Langkah Selanjutnya
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Pastikan pertumbuhan anak Anda tetap sehat dengan mendeteksi
              stunting sejak dini. Daftar sekarang untuk mengakses alat deteksi
              stunting kami yang mudah digunakan dan dapatkan wawasan yang
              dipersonalisasi untuk perkembangan anak Anda. Bergabunglah dengan
              kami dalam mempromosikan masa depan yang lebih sehat untuk setiap
              anak!
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
            <Link
              to="/login"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Mulai Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
