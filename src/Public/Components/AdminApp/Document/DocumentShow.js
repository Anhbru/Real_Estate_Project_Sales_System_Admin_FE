import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import documentService from '../../Service/DocumentService';


const DocumentEditor = () => {
    const { id } = useParams(); // Get the documentTemplateID from the URL
    const [documentName, setDocumentName] = useState('');
    const [documentFile, setDocumentFile] = useState(''); // Store plain text content
    const [status, setStatus] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isHtmlMode, setIsHtmlMode] = useState(false);

    useEffect(() => {
        const getDocumentDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch document details
                const res = await documentService.adminDetailDocument(id);
                if (res.status === 200) {
                    setDocumentName(res.data.documentName);
                    setStatus(res.data.status);

                    // Fetch the document content as plain text
                    const fileRes = await documentService.adminDetailDocumentFile(id);
                    if (fileRes.status === 200) {
                        setDocumentFile(fileRes.data); // Assuming this is plain text
                    } else {
                        setError('Unable to fetch document content.');
                    }
                } else {
                    setError('Document not found.');
                }
            } catch (err) {
                setError('Error fetching document: ' + err.message);
                console.error('Error fetching document:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            getDocumentDetails();
        }
    }, [id]);

    const handleSave = async () => {
        const payload = {
            documentName,
            documentFile, 
            status,
        };

        try {
            const res = await documentService.adminUpdateDocument(id, payload);
            if (res.status === 200) {
                alert('Document saved successfully!');
            } else {
                alert('Failed to save document.');
            }
        } catch (err) {
            console.error('Error saving document:', err);
            alert('Error saving document.');
        }
    };

    const toggleHtmlView = () => {
        setIsHtmlMode(!isHtmlMode);
    };

    return (
        <div>
            <h1>Document Editor</h1>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <div>
                    <div>
                        <label>
                            Document Name:
                            <input
                                type="text"
                                value={documentName}
                                onChange={(e) => setDocumentName(e.target.value)}
                            />
                        </label>
                    </div>

                    <button onClick={toggleHtmlView}>
                        {isHtmlMode ? 'Switch to Editor' : 'Show Plain Text'}
                    </button>

                    <div>
                        <label>Document Content:</label>
                        {isHtmlMode ? (
                            <textarea
                                value={documentFile}
                                onChange={(e) => setDocumentFile(e.target.value)}
                                rows="20"
                                cols="100"
                                style={{ whiteSpace: 'pre-wrap' }} 
                            />
                        ) : (
                            <CKEditor
                                editor={ClassicEditor}
                                data={documentFile} 
                                config={{
                                    allowedContent: true, 
                                    enterMode: 'P',
                                    shiftEnterMode: 'BR',
                                    removePlugins: ['Autoformat'],
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setDocumentFile(data); 
                                }}
                            />
                        )}
                    </div>

                    <div>
                        <label>
                            Status:
                            <input
                                type="checkbox"
                                checked={status}
                                onChange={(e) => setStatus(e.target.checked)}
                            />
                        </label>
                    </div>

                    <button onClick={handleSave}>Save</button>
                </div>
            )}
        </div>
    );
};

export default DocumentEditor;
