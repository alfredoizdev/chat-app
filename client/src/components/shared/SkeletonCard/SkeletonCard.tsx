import { styled } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const SkeletonCardContainer = styled('div')(({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    padding: '10px',
    'span': {
        marginLeft: '10px',
    }
}));

interface Props {
    many?: number;
}

const SkeletonCard = ({ many = 1 }: Props) => {
    return (
        <>
            {Array.from({ length: many }).map((_, index) => (
                <SkeletonCardContainer key={index}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <span>
                        <Skeleton variant="text" width={30} height={15} />
                        <Skeleton variant="text" width={90} height={15} />
                        <Skeleton variant="text" width={70} height={15} />
                    </span>
                </SkeletonCardContainer>
            ))}
        </>
    );
};

export default SkeletonCard;