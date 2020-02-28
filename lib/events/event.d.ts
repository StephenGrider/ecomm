export interface Event {
    metadata: {
        type: string;
        timestamp: string;
        id: string;
    };
    context: any;
    data: any;
}
