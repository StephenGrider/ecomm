export interface Event {
    metadata: {
        type: string;
        version: string;
        timestamp: string;
        id: string;
    };
    context: any;
    data: any;
}
