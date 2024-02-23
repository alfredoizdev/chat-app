import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type AlertSnackbarsProps = {
    error: string | null;
    typeOfErroor: "error" | "success" | "info" | "warning";
};

export default function AlertSnackbars({ error, typeOfErroor }: AlertSnackbarsProps) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (error) {
            setOpen(true);
        }
    }, [error]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        event?.preventDefault();
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleClose}
                    severity={typeOfErroor}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {error}, please try other email
                </Alert>
            </Snackbar>
        </div>
    );
}
