import "./globals.css";

export const metadata = {
  title: "Faisal Ayaz | PHP & Laravel Developer",
  description:
    "Experienced PHP developer specializing in Laravel, CodeIgniter, OpenCart, Core PHP, and scalable backend systems.",
  keywords: [
    "Faisal Ayaz",
    "PHP Developer",
    "Laravel Developer",
    "Backend Developer",
    "Portfolio"
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
