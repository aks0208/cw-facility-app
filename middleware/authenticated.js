export default async function ({ $auth, redirect, route }) {
    if (!$auth.user) {
        redirect(`/login`)
    }
}