import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import JumperList from '@/Components/Jumper/List.jsx'
const Jumpers = (
    {
        auth,
        list
    }
) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Parachutists Admin</h2>}
        >
            <JumperList
                list={list}
            />
        </AuthenticatedLayout>
    )
}

export default Jumpers
