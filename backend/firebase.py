import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("gem-edu-firebase-key.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

def get_collection_ref(mode):
    if mode == 'advisor':
        return db.collection('chat-hist-advisor')
    else:
        return db.collection('chat-hist-tutor')

def add_id_to_db(chat_id, mode):
    collection_ref = get_collection_ref(mode)
    doc_ref = collection_ref.document(chat_id)
    data = {
        'history': 'NULL'
    }
    doc_ref.set(data)

def update_history(chat_id, history, mode):
    collection_name = 'chat-hist-tutor' if mode == 'tutor' else 'chat-hist-advisor'
    doc_ref = db.collection(collection_name).document(chat_id)
    doc = doc_ref.get()
    
    if doc.exists:
        print(f"Document found: {doc.id}")
        doc_ref.update({'history': history})
    else:
        print(f"Document with chat_id {chat_id} does not exist in {collection_name}.")
        raise Exception("Chat_id does not exist")


def get_data_from_db(chat_id, mode):
    collection_ref = get_collection_ref(mode)
    doc_ref = collection_ref.document(chat_id)
    doc = doc_ref.get()

    if doc.exists:
        data = doc.to_dict()
        return(data)
    else:
        return(f'ChatID {chat_id} does not exist.')

def get_all_chat_ids(mode):
    collection_name = f'chat-hist-{mode}'
    chat_ids = []
    docs = db.collection(collection_name).stream()
    for doc in docs:
        chat_ids.append(doc.id)
    return chat_ids