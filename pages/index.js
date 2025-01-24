import useSWR from "swr";

async function fetchAPI() {
  const response = await fetch("/api/v1/status");
  return await response.json();
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let updatedText = "Carregando...";
  if (!isLoading && data) {
    updatedText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedText}</div>;
}
