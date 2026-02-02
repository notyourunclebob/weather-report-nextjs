import "@/styles/globals.scss";
import "@/styles/weather-icons/css/weather-icons-wind.css";
import "@/styles/weather-icons/css/weather-icons.min.css";

export const metadata = {
  title: "Weather Report by James R Wilson",
  description: "A vanilla javascript weather app with a nextjs api backend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="g-base">
        {children}
      </body>
    </html>
  );
}
