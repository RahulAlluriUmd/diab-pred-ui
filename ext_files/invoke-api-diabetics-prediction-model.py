import os
import io
import boto3
import json
import csv
import array

# grab environment variables
ENDPOINT_NAME = os.environ['ENDPOINT_NAME']
runtime= boto3.client('runtime.sagemaker')

def lambda_handler(event, context):
    print("Received event: " + json.dumps(event))
    
    data = json.loads(json.dumps(event))
    print(f'data: {data}')
    payload = data['data'][0]
    print(payload)

    try:
        sage_response = sage_invoke(payload)
    except Exception as e:
        print(f'expection occured: {str(e)}')
        sage_response = str(e)
    
    print(f'Response from sage model: {sage_response}')

    predicted_value = round(float(sage_response), 2)
    risk = None

    print(f'predicted value: {predicted_value}')

    if ( predicted_value >= 0.75):
        risk = 'High'
    elif (predicted_value >= 0.25 and predicted_value < 0.75):
        risk = 'Medium'
    else:
        risk = 'Low'

    response = {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': {
            'message': 'Successfully predicted the user',
            'probability': predicted_value,
            'risk': risk
        }
    }
    
    return response

def sage_invoke(request):
    try:
        
        formatted_request = format_input(request)
        print(f'request to sageMaker endpoint : {formatted_request}')

        print('calling sage maker endpoint...!')

        try:
            response = runtime.invoke_endpoint(EndpointName=ENDPOINT_NAME,
                                       ContentType='text/csv',
                                       Body=formatted_request)
            
            print('successfully called sagemaker enpoint..!!')
        except Exception as e:
            print(f'Error occured while calling sage Maker endpoint... {str(e)}')

        print(f'response: {response}')


        result = json.loads(response['Body'].read().decode())

        return result

    except Exception as e:
        print(f'expection occured: {str(e)}')
        return str(e)

def format_input(request): 
    input_values = [
        str(request.get('pregnancies', '0')),
        str(request.get('glucose','0')),
        str(request.get('BP','0')),
        str(request.get('SkinThickness','0')),
        str(request.get('Insulin','0')),
        str(request.get('BMI','0')),
        str(request.get('DiabetesPedigreeFunction','0')),
        str(request.get('Age','0')),
    ]

    csv_format = ','.join(input_values)
    print(f"CSV string: {csv_format}")

    print('done input formatting')

    return csv_format.encode('utf-8')
