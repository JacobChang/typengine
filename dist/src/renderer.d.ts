export interface Renderer {
    render(template: string, params?: any): Promise<string>;
}
