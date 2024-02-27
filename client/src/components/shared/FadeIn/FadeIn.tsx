import { styled } from '@mui/material';

const Wrap = styled("div")(({
    cursor: "pointer",
    animation: 'fadeIn 0.9s',

    '@keyframes fadeIn': {
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
    },

}));

interface Props {
    children: React.ReactNode;
}


const FadeIn = ({ children }: Props) => {
    return (
        <Wrap>
            {children}
        </Wrap>
    );
};

export default FadeIn;