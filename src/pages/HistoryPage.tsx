import { useEffect } from "react";
import HistoryTable from "@widgets/HistoryTable/HistoryTable";
import { useParams } from "react-router-dom";
import TitleBack from "@components/TitleBack/TitleBack";
import RefreshBut from "@components/RefreshBut/RefreshBut";
import Box from "@mui/material/Box";
import useFetching from "@hooks/useFetching";
import { getHistoryByRequestId } from "@services/history.service";
import { HistoryType } from "@mytypes/api/history/history.types";

export function HistoryPage() {
  const { requestId } = useParams();

  const { data, fetchQuery, isLoading } = useFetching<HistoryType[]>({
    callback: async () => {
      if (!requestId) {
        throw new Error("Request ID is required");
      }

      const history = await getHistoryByRequestId(+requestId);

      return history;
    },
    defaultValue: [],
  });

  useEffect(() => {
    fetchQuery();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TitleBack title={"Заявка №" + requestId} />
        <RefreshBut onClick={fetchQuery} size={32} />
      </Box>
      <HistoryTable isLoading={isLoading} histories={data} />
    </>
  );
}
