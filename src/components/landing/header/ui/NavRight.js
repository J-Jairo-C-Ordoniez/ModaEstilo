import Link from 'next/link';
import { Search, User } from 'lucide-react';

export default function NavRight({ setBreadcrumbsRoute }) {
    return (
        <div className="flex items-center gap-4">
            <button
                aria-label="Search"
                onClick={() => setBreadcrumbsRoute("búscar")}
                className="text-secondary/90 hover:text-primary transition-colors cursor-pointer"
            >
                <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>

            <Link
                href="/login"
                onClick={() => setBreadcrumbsRoute("iniciar sesión")}
                aria-label="User Account"
                className="text-secondary/90 hover:text-primary transition-colors"
            >
                <User className="w-5 h-5" strokeWidth={1.5} />
            </Link>
        </div>
    );
}
