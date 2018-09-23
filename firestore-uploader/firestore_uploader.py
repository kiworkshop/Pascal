import csv
from google.cloud import firestore

BATCH_SIZE = 500
start_doc_id = 1

def print_how_to_use():
    print('1. 처음부터 업로드하기')
    print('2. 이어서 업로드하기')
    print('-----------------')

def select_upload_type():
    select = int(input('> '))
    if select == 2:
        start_id = int(input('이어서 업로드 시작할 id: '))
        set_start_doc_id(start_id)

def set_start_doc_id(start_id):
    global start_doc_id
    start_doc_id = start_id

def fastforward(reader):
    global start_doc_id
    count = start_doc_id - 1
    for _ in range(count):
        next(reader)

if __name__ == '__main__':
    csvfile = open('classification.csv', 'r')
    fields = ('지정상품(국문)','NICE분류','유사군코드','지정상품(영문)','출처')
    reader = csv.DictReader(csvfile, fields)
    next(reader) # skip csv header line

    print_how_to_use()
    select_upload_type()
    fastforward(reader)

    current_doc_id = start_doc_id
    current_batch_count = 0
    database = firestore.Client()
    batch = database.batch()
    for row in reader:
        doc_ref = database.collection(u'trademark').document(str(current_doc_id))
        batch.set(doc_ref, row)
        current_doc_id += 1
        current_batch_count += 1

        if current_batch_count == BATCH_SIZE:
            batch.commit()
            batch = database.batch()
            current_batch_count = 0
            print(current_doc_id, 'committed')
    
    if current_batch_count > 0:
        batch.commit()
        print(current_doc_id, 'committed')
