import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <>
            <Head title="Dashboard" />
            {auth.user ? (
                <AuthenticatedLayout
                    user={auth.user}
                    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
                >
                    <div className='app'>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="py-12">
                                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                        <div className="p-6 text-gray-900">You're logged in!</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AuthenticatedLayout>
            ) : (
                <>
                    <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
                        <Link
                            href={route('login')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Log in
                        </Link>

                        <Link
                            href={route('register')}
                            className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Register
                        </Link>
                    </div>
                </>
            )}
        </>
    );
}
