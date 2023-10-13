import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react'

export default function Show({ auth, user }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User { user.id } Details</h2>}
        >
            <Head title="Show" />
            <div className='app'>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    <h1>Welcome User</h1>
                                    <p>Hello {user.name}, welcome to your first Inertia app!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
