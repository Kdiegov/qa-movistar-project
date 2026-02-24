import { expect, Locator, Page } from '@playwright/test';
export class MainPage {
    // Locators
    public readonly page: Page;
    public readonly appLauncher: Locator;
    public readonly appLauncherText: Locator;

    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.appLauncher = page.getByRole('button', { name: 'App Launcher' });
        this.appLauncherText = page.getByRole('combobox', { name: 'Search apps and items...' });
    }
    
    // Method
    async buscarObjeto(appName: string) {
        await this.appLauncher.click();
        await this.appLauncherText.pressSequentially(appName, { delay: 100 });
        await this.page.getByRole('option', { name: appName, exact: true }).first().click();
        await this.page.getByRole('heading', { name: appName, level: 1, exact: true }).waitFor();
    }
}