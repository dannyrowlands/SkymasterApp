import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import PilotList from '@/Components/Pilot/List.jsx'
const Pilots = (
    {
        auth,
        list
    }
) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pilots Admin</h2>}
        >
            <PilotList
                list={list}
                shouldBeEditable={true}
            />
        </AuthenticatedLayout>
    )
}

export default Pilots
