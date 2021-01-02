import NodeWebSocket from "ws"
import * as http from "http";

export type BrowserWebSocketType = InstanceType<typeof WebSocket>;
export type NodeWebSocketType = InstanceType<typeof NodeWebSocket>;
export type NodeWebSocketTypeOptions = NodeWebSocket.ClientOptions;

export interface IWSClientAdditionalOptions {
    autoconnect?: boolean;
    reconnect?: boolean;
    reconnect_interval?: number;
    max_reconnects?: number;
}

export interface ICommonWebSocketFactory {
    (address: string, options: IWSClientAdditionalOptions): ICommonWebSocket;
}

export interface WebSocketEvents extends WebSocketEventMap {
    "upgrade": http.IncomingMessage;
}

export interface ICommonWebSocket {
    send: (
        data: Parameters<BrowserWebSocketType["send"]>[0],
        optionsOrCallback: ((error?: Error) => void) | Parameters<NodeWebSocketType["send"]>[1],
        callback?: (error?: Error) => void
    ) => void;
    close: (code?: number, reason?: string) => void;
    addEventListener<K extends keyof WebSocketEvents>(
        type: K,
        listener: (ev: WebSocketEvents[K]) => any,
        options?: boolean | AddEventListenerOptions
    ): void;
}
