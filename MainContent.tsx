
import { useState, type FC } from "react";
import { Typography, Box } from "@mui/material";
import ContentList from "../../../components/shared/ContentList";
import MainLayout from "../../../components/layout/MainLayout";
import MainContainer from "../../../components/shared/MainContainer";
import ContentView from "./ContentView"; 

const themesItems = [
  {
    id: "1",
    title: "Cuidados Básicos de Enfermería",
    description: "Fundamentos y técnicas básicas de enfermería",
    status: "completed" as const,
  },
  {
    id: "2",
    title: "Cuidados Postoperatorios",
    description: "Atención de enfermería en el postoperatorio",
    status: "in-progress" as const,
  },
  {
    id: "3",
    title: "Cuidados Críticos",
    description: "Enfermería en unidades de cuidados intensivos",
    status: "pending" as const,
  },
  {
    id: "4",
    title: "Enfermería Pediátrica",
    description: "Cuidados especializados en pediatría",
    status: "pending" as const,
  },
  {
    id: "5",
    title: "Enfermería Geriátrica",
    description: "Atención integral al adulto mayor",
    status: "pending" as const,
  },
  {
    id: "6",
    title: "Enfermería en Salud Mental",
    description: "Cuidados en psiquiatría y salud mental",
    status: "pending" as const,
  },
  {
    id: "7",
    title: "Cuidados Paliativos",
    description: "Atención al final de la vida",
    status: "pending" as const,
  },
];

const MainContent: FC = () => {
  const [activeTab, setActiveTab] = useState("temas");
  const [currentView, setCurrentView] = useState<"themes" | "content">(
    "themes"
  );
  const [selectedTheme, setSelectedTheme] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const tabs = [
    { label: "Temas", value: "temas" },
    { label: "Añadir", value: "añadir" },
  ];

  const handleItemClick = (id: string) => {
    const theme = themesItems.find((item) => item.id === id);
    if (theme) {
      setSelectedTheme({ id: theme.id, name: theme.title });
      setCurrentView("content");
    }
  };

  const handleBackToThemes = () => {
    setCurrentView("themes");
    setSelectedTheme(null);
  };

  if (currentView === "content" && selectedTheme) {
    return (
      <ContentView
        themeId={selectedTheme.id}
        themeName={selectedTheme.name}
        onBack={handleBackToThemes}
      />
    );
  }

  const renderContent = ({ activeTab }: { activeTab: string }) => {
    switch (activeTab) {
      case "temas":
        return (
          <ContentList
            items={themesItems.map((item) => ({
              ...item,
              onClick: () => handleItemClick(item.id),
            }))}
            emptyMessage="No hay temas disponibles"
          />
        );
      case "añadir":
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="400px"
            flexDirection="column"
            gap={2}
          >
            <Typography variant="h6" color="textSecondary">
              Añadir nuevo tema
            </Typography>
            <Typography variant="body2" color="textSecondary">
              TODO: Hacer lógica de agregar temas y hacerlos dinámicos
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout title="SIMMERR" showToolbox={true} showScoreButton={false}>
      <MainContainer
        tabs={tabs}
        activeTab={activeTab}
        enableScrollbar={true}
        onTabChange={setActiveTab}
      >
        {renderContent({ activeTab })}
      </MainContainer>
    </MainLayout>
  );
};

export default MainContent;
