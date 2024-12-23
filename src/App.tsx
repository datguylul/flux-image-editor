import { DGThemeType } from "@/common";
import { useDocumentTitle } from "@/hook";
import ErrorPage from "@/pages/ErrorPage";
import { AppRoutes } from "@/routes";
import { useTheme } from "@/store";
import { ConfigProvider, theme } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useShallow } from "zustand/react/shallow";
import "./App.css";
import { ToastProvider } from "./components";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.locale("vi");

function App() {
	useDocumentTitle();
	const [dgTheme] = useTheme(useShallow((stt) => [stt.theme]));

	useEffect(() => {
		const htmlClasses = document.querySelector("html")?.classList;
		if (dgTheme === DGThemeType.DARK) {
			htmlClasses?.remove(DGThemeType.LIGHT);
		} else {
			htmlClasses?.remove(DGThemeType.DARK);
		}
		document.querySelector("html")?.classList.add(dgTheme);
	}, [dgTheme]);

	return (
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm,
				token: {
					borderRadius: 4,
					// fontFamily: "JetBrains Mono",
				},
			}}
		>
			<div className="h-screen w-screen bg-background dark:bg-backgroundDark overflow-auto">
				<ErrorBoundary
					FallbackComponent={ErrorPage}
					onReset={() => {
						window.location.href = "/";
					}}
				>
					<div className="flex flex-1 overflow-auto justify-between">
						<AppRoutes />
					</div>
					<ToastProvider />
				</ErrorBoundary>
			</div>
		</ConfigProvider>
	);
}

export default App;
