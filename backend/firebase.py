import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("gem-edu-firebase-key.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

def add_id_to_db(chat_id):
    doc_ref = db.collection('chat-hist').document(chat_id)
    doc = doc_ref.get()
    data = {
        'history': 'NULL'
    }
    doc_ref.set(data)

def update_history(chat_id, history):
    doc_ref = db.collection('chat-hist').document(chat_id)
    doc = doc_ref.get()
    if doc.exists:
        doc_ref.update({'history': history})
    else:
        raise Exception("Chat_id does not exist")

def get_data_from_db(chat_id):
    doc_ref = db.collection('chat-hist').document(chat_id)
    doc = doc_ref.get()

    if doc.exists:
        data = doc.to_dict()
        return(f'Document data: {data}')
    else:
        return(f'ChatID {chat_id} does not exist.')



