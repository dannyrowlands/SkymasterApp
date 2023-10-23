import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import InstructorList from '@/Components/Instructors/List.jsx'
const Instructors = (
    {
        auth,
        list
    }
) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Instructors Admin</h2>}
        >
            <InstructorList
                list={list}
                shouldBeEditable={true}
            />
        </AuthenticatedLayout>
    )
}

export default Instructors
