describe('Test app components', () => {
  const baseUrl = 'http://localhost:9009/iframe.html?id=';

  it('AddItemForm renders correctly', async () => {
    // APIs from jest-puppeteer
    await page.goto(`${baseUrl}todolist-additemform--add-item-form-example`);
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });

  it('AppWithRedux renders correctly', async () => {
    // APIs from jest-puppeteer
    await page.goto(`${baseUrl}todolist-appwithredux--app-with-redux-example`);
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });

  it('EditableSpan renders correctly', async () => {
    // APIs from jest-puppeteer
    await page.goto(`${baseUrl}todolist-editablespan--editable-span-example`);
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });

  it('TaskIsDone renders correctly', async () => {
    // APIs from jest-puppeteer
    await page.goto(`${baseUrl}todolist-task--task-is-done-example`);
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });

  it('TaskIsNotDone renders correctly', async () => {
    // APIs from jest-puppeteer
    await page.goto(`${baseUrl}todolist-task--task-is-not-done-example`);
    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});
