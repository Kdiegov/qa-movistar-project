import {Locator, Page, Expect} from '@playwright/test'
import { stringify } from 'node:querystring';

export class Account {
    //locators
    readonly page:Page;
    readonly newButton: Locator;
    readonly nextButton: Locator;
    readonly accountInput: Locator;
    readonly typeOption: Locator;
    readonly activeOption: Locator;
    readonly statusOption: Locator;
    readonly emailInput: Locator;
    readonly addressBillingInput: Locator;
    readonly billingStreetInput: Locator;
    readonly addressShippingInput: Locator;
    readonly shippingStreetInput: Locator;
    readonly saveButton: Locator;
    readonly relatedTab: Locator;
    readonly newOrderButton: Locator;
    readonly dateButton: Locator;
    readonly pricelistButton: Locator;
    readonly statusButton: Locator;
    readonly addProductButton: Locator;
    readonly searschButton: Locator;
    readonly quantityButton: Locator;
    readonly cantidadbUTTON: Locator;

    //constructor
    constructor (page:Page){
        this.page = page;
        this.newButton = page.getByRole('button', { name: 'New', exact: true });
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.accountInput = page.getByRole('textbox', { name: 'Account Name' });
        this.typeOption = page.getByRole('combobox', { name: 'Type', exact: true });
        this.activeOption = page.getByRole('combobox', { name: 'Active' });
        this.statusOption = page.getByRole('combobox', { name: 'Status' });
        this.emailInput = page.getByRole('textbox', { name: 'Billing eMail Address' });
        this.addressBillingInput = page.getByRole('group', { name: 'Billing Address' }).getByPlaceholder('Search Address');
        this.billingStreetInput = page.getByRole('textbox', { name: 'Billing Street' });
        this.addressShippingInput = page.getByRole('group', { name: 'Shipping Address' }).getByPlaceholder('Search Address');
        this.shippingStreetInput = page.getByRole('textbox', { name: 'Shipping Street' });
        this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
        this.relatedTab = page.getByRole('tab', { name: 'Related' });
        this.newOrderButton = page.getByRole('button', { name: 'New Order' });
        this.dateButton = page.getByRole('textbox', { name: 'Order Start Date' });
        this.pricelistButton = page.getByRole('combobox', { name: 'Price List' });
        this.statusButton = page.getByRole('combobox', { name: 'Status' });
        this.addProductButton = page.getByRole('button', { name: 'Add Products' });
        this.searschButton = page.getByRole('combobox', { name: 'Search Products Search' });
        this.quantityButton = page.getByRole('button', { name: 'Edit Quantity: Item null' });
        this.cantidadbUTTON = page.getByRole('textbox', { name: 'Quantity *' });
    }

    //métodos
    async fillLookup(locator: Locator, value: string) {
        await locator.click();
        await locator.clear();
        await locator.pressSequentially(value, { delay: 100 });
        await this.page.waitForTimeout(1000);
    }

    async fillLookupOption(locator: Locator, value: string) {
        await locator.click();
        await locator.clear();
        await locator.pressSequentially(value, { delay: 100 });
        await this.page.waitForTimeout(1000);

        const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regexStartWith = new RegExp(`^${escapedValue}`, 'i'); 
        
        const option = this.page.getByRole('option', { name: regexStartWith }).first();
        await option.waitFor({ state: 'visible' });
        await option.click();
    }


    async createAccountCustomer(account: string, type: string, active: string, status: string, email: string, address: string, street: string, priority){
        await this.newButton.click();
        await this.page.getByText('Use consumer accounts for').click();
        await this.nextButton.click();
        await this.fillLookup(this.accountInput, account);
        await this.typeOption.click();
        await this.page.getByRole('option', { name: type }).click();
        await this.activeOption.click();
        await this.page.getByRole('option', { name: active }).click();
        await this.statusOption.click();
        await this.page.getByRole('option', { name: status, exact: true }).click();
        await this.fillLookup(this.emailInput, email);
        await this.fillLookupOption(this.addressBillingInput, address);
        await this.fillLookup(this.billingStreetInput, street);
        await this.fillLookupOption(this.addressShippingInput, address);
        await this.fillLookup(this.shippingStreetInput, street);
        await this.page.getByRole('option', { name: 'eMail' }).click();
        await this.page.getByRole('button', { name: 'Move selection to Chosen' }).click();
        await this.saveButton.click();
    }

    async createOrdenFromAccountCustomer(status:string){
        await this.relatedTab.click();
        await this.newOrderButton.click();
        await this.page.getByText('Order - Consumer').click();
        await this.nextButton.click();
        await this.dateButton.click();
        await this.page.getByRole('button', { name: 'Today' }).click();
        await this.pricelistButton.click();
        await this.page.getByRole('option', { name: 'Enterprise' }).click();
        await this.statusButton.click();
        await this.page.getByRole('option', { name: status }).click();
        await this.saveButton.click();
    }

    async createProductToOrder(producto:string, cantidad:string){
        await this.relatedTab.click();
        await this.addProductButton.click();
        await this.fillLookup(this.searschButton, producto);
        await this.page.locator('.slds-grid > .slds-checkbox--faux').first().click();
        await this.nextButton.click();
        await this.quantityButton.click;
        await this.fillLookup(this.cantidadbUTTON, cantidad);
        await this.saveButton.click();
        await this.page.locator('button').filter({ hasText: 'Mark Status as Complete' }).click();
        await this.page.locator('button').filter({ hasText: 'Mark Status as Complete' }).click();
        await this.page.locator('button').filter({ hasText: 'Mark Status as Complete' }).click();
    }
}