export async function handler(event: string, context: string) {
    console.log('Stage Name is: ' + process.env.stage);
    return {
        body: 'Hello from the Lambda Function',
        statuscode: 200,
    };
}