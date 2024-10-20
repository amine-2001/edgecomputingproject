from flask import Flask, request, jsonify
import requests
import random
import time
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Function to split data
def split_data(data, n):
    k, m = divmod(len(data), n)
    return [data[i*k + min(i, m):(i+1)*k + min(i+1, m)] for i in range(n)]

# Function to merge sorted lists
def merge(*lists):
    result = []
    for lst in lists:
        result = sorted(result + lst)
    return result

# Function to send data to remote machine
def send_to_machine(data_part, machine_url):
    start = time.time()
    response = requests.post(machine_url, json={'data': data_part})
    duration = time.time() - start
    return response.json(), duration

@app.route('/sort', methods=['POST'])
def sort_endpoint():
    try:
        # Get 'n' for the size of the array and 'mode' for sorting mode
        n = int(request.get_json().get('n', 10))
        mode = request.get_json().get('mode', 'local')  # 'local' or 'distributed'
        if n <= 0:
            raise ValueError("Array size must be a positive integer.")
    except (ValueError, TypeError):
        return jsonify({'error': 'Invalid input for array size. Please provide a positive integer.'}), 400

    data = [random.randint(0, 1000000) for _ in range(n)]

    if mode == 'local':
        # Local sorting (single machine)
        total_start = time.time()
        sorted_data = sorted(data)
        time.sleep(3)
        total_duration = (time.time() - total_start)

        # Return sorted data and total execution time
        return jsonify({
            'sorted_data': sorted_data,
            'local_execution_time': total_duration,
            'total_execution_time': total_duration
        })
    elif mode == 'distributed':
        # Distributed sorting (multiple machines)
        split_data_list = split_data(data, 2)

        # Define remote machines URLs
        machine1_url = "http://192.168.1.18:5001/sort"

        total_start = time.time()

        # Sort part locally
        local_start = time.time()
        sorted_part1 = sorted(split_data_list[0])
        local_duration = time.time() - local_start

        # Send other parts to remote machines
        sorted_part2, remote_duration1 = send_to_machine(split_data_list[1], machine1_url)

        # Merge the results
        final_sorted_data = merge(sorted_part1, sorted_part2)

        total_duration = time.time() - total_start

        # Return sorted data and execution times for each part
        return jsonify({
            'sorted_data': final_sorted_data,
            'local_execution_time': local_duration,
            'remote_execution_time_1': remote_duration1,
            'total_execution_time': total_duration
        })
    else:
        return jsonify({'error': 'Invalid mode. Use "local" or "distributed".'}), 400

if __name__ == '__main__':
    app.run(host='192.168.75.1', port=5000)
