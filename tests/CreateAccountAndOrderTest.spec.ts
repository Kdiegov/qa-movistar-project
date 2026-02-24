import { test, expect } from '@playwright/test';
import { loginToSalesforce } from '../utils/loginHelper';
import { MainPage } from '../pages/MainPage';
import { Account } from '../pages/AccountPage';

test.beforeEach(async ({ page }) => {
        test.setTimeout(120000);

        await loginToSalesforce(page);
    });

test.describe('Flujos de Salesforce', () => {
    test('Validar crear cuenta', async ({ page }) => {
        const main = new MainPage(page);
        const createAccount = new Account(page);
        const createOrder = new Account(page);
        const createProduct = new Account(page);

        await main.buscarObjeto('Accounts');
        await page.waitForTimeout(2000);

        await createAccount.createAccountCustomer(
            'Kevin Test',                                           // account name
            'Consumer',                                             // type
            'Yes',                                                  // active
            'Active',                                               // status
            'kdiego@salesforce.com',                                // email
            'CELEX ESIME Azcapotzalco',                             // address
            'Av. Sta. Ana 1000',                                    // street
            'Medium'                                                // priority
        );

        await createOrder.createOrdenFromAccountCustomer(
            'Draft'                                                 // status
        );

        await createProduct.createProductToOrder(
            'iPhone 11 Pro',                                                // status
            '1'                                                 // status
        );
    });

});