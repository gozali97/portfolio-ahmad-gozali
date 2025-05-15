// Header component
import { useTheme } from '../context/ThemeContext';

export default function Header() {
    const { theme } = useTheme();
    
    // This component is now minimal since we've moved navigation to the Navigation component
    return (
        <header className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-4 transition-colors duration-300">
            {/* Header content is now in the Navigation component */}
        </header>
    );
}