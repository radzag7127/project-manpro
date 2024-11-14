import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-8 mt-12">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Rumaku. All rights reserved.</p>
        <div className="mt-4">
          <Link
            href="/routes/terms-and-services"
            className="hover:underline mr-4"
          >
            Terms of Service
          </Link>
          <Link
            href="/routes/terms-and-services"
            className="hover:underline mr-4"
          >
            Privacy Policy
          </Link>
          <Link href="/routes/contact-us" className="hover:underline">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
