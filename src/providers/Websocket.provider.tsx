import { pusher } from "@configs/websockets";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { RequestType } from "@mytypes/api/request/request.types";
import { deleteRequest, updateRequest } from "@store/requests/requests.slice";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export function WebsocketProvider({ children }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const channel = pusher.subscribe("requests");

    channel.bind("request-updated", (request: RequestType) => {
      dispatch(updateRequest(request));
    });

    channel.bind("request-deleted", (request: RequestType) => {
      dispatch(deleteRequest(request.id));
    });

    return () => {
      channel.disconnect();
    };
  }, []);

  return <>{children}</>;
}
