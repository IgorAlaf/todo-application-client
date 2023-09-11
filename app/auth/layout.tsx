import { Header } from '@/components'
const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Header isAuth={false} />
			{children}
		</>
	)
}

export default layout
