'use client'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box  mt={'220px'} >
    <Typography sx={{ 
        color: '#f5605b',fontSize: '26px', fontWeight: 'bold', textAlign: "left" , marginBottom: '40px'
     }}>
        Feedback Partners
    </Typography>
    <Box sx={{
        display:'flex',
        justifyContent: 'space-between', // Cách đều nhau
        flexWrap: 'wrap', // Đảm bảo hiển thị tốt trên các màn hình nhỏ
        gap: 6 // Thêm khoảng cách giữa các Card
       
    }} >
    

    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Huỳnh Quang Huy"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/assets/partners/Logo-VNG.png"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Chức năng hoạt động ổn định và đáp ứng nhu cầu, nhưng cần bổ sung tài liệu hướng dẫn chi tiết hơn để hỗ trợ người mới tiếp cận nhanh chóng, tránh mất thời gian tìm hiểu.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>

      
    </Card>

<Card sx={{ maxWidth: 345 }}>
<CardHeader
  avatar={
    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
      R
    </Avatar>
  }
  action={
    <IconButton aria-label="settings">
      <MoreVertIcon />
    </IconButton>
  }
  title="Trương Quốc Khánh"
  subheader="September 14, 2016"
/>
<CardMedia
  component="img"
  height="194"
  image="/assets/partners/Logo-TMA.png"
  alt="Paella dish"
/>
<CardContent>
  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
  Khả năng tích hợp với Google Sheets rất hữu ích, giúp quản lý dữ liệu dễ dàng hơn, nhưng đôi khi đồng bộ chưa kịp thời. Nên có thông báo trạng thái đồng bộ để người dùng nắm bắt.
  </Typography>
</CardContent>
<CardActions disableSpacing>
  <IconButton aria-label="add to favorites">
    <FavoriteIcon />
  </IconButton>
  <IconButton aria-label="share">
    <ShareIcon />
  </IconButton>
  <ExpandMore
    expand={expanded}
    onClick={handleExpandClick}
    aria-expanded={expanded}
    aria-label="show more"
  >
    <ExpandMoreIcon />
  </ExpandMore>
</CardActions>
<Collapse in={expanded} timeout="auto" unmountOnExit>
  <CardContent>
    <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
    <Typography sx={{ marginBottom: 2 }}>
      Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
      aside for 10 minutes.
    </Typography>
    <Typography sx={{ marginBottom: 2 }}>
      Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
      medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
      occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
      large plate and set aside, leaving chicken and chorizo in the pan. Add
      pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
      stirring often until thickened and fragrant, about 10 minutes. Add
      saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
    </Typography>
    <Typography sx={{ marginBottom: 2 }}>
      Add rice and stir very gently to distribute. Top with artichokes and
      peppers, and cook without stirring, until most of the liquid is absorbed,
      15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
      mussels, tucking them down into the rice, and cook again without
      stirring, until mussels have opened and rice is just tender, 5 to 7
      minutes more. (Discard any mussels that don&apos;t open.)
    </Typography>
    <Typography>
      Set aside off of the heat to let rest for 10 minutes, and then serve.
    </Typography>
  </CardContent>
</Collapse>


</Card>

<Card sx={{ maxWidth: 345 }}>
<CardHeader
  avatar={
    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
      R
    </Avatar>
  }
  action={
    <IconButton aria-label="settings">
      <MoreVertIcon />
    </IconButton>
  }
  title="Nguyễn Đoàn Gia Khánh"
  subheader="September 14, 2016"
/>
<CardMedia
  component="img"
  height="194"
  image="/assets/partners/Logo-unitech.png"
  alt="Paella dish"
/>
<CardContent>
  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
    Giao diện phần mềm trực quan và dễ sử dụng, nhưng tốc độ tải dữ liệu đôi khi hơi chậm. Nên tối ưu hiệu suất để mang lại trải nghiệm mượt mà hơn cho người dùng.
  </Typography>
</CardContent>
<CardActions disableSpacing>
  <IconButton aria-label="add to favorites">
    <FavoriteIcon />
  </IconButton>
  <IconButton aria-label="share">
    <ShareIcon />
  </IconButton>
  <ExpandMore
    expand={expanded}
    onClick={handleExpandClick}
    aria-expanded={expanded}
    aria-label="show more"
  >
    <ExpandMoreIcon />
  </ExpandMore>
</CardActions>
<Collapse in={expanded} timeout="auto" unmountOnExit>
  <CardContent>
    <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
    <Typography sx={{ marginBottom: 2 }}>
      Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
      aside for 10 minutes.
    </Typography>
    <Typography sx={{ marginBottom: 2 }}>
      Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
      medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
      occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
      large plate and set aside, leaving chicken and chorizo in the pan. Add
      pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
      stirring often until thickened and fragrant, about 10 minutes. Add
      saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
    </Typography>
    <Typography sx={{ marginBottom: 2 }}>
      Add rice and stir very gently to distribute. Top with artichokes and
      peppers, and cook without stirring, until most of the liquid is absorbed,
      15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
      mussels, tucking them down into the rice, and cook again without
      stirring, until mussels have opened and rice is just tender, 5 to 7
      minutes more. (Discard any mussels that don&apos;t open.)
    </Typography>
    <Typography>
      Set aside off of the heat to let rest for 10 minutes, and then serve.
    </Typography>
  </CardContent>
</Collapse>


</Card>
</Box>
</Box>
  );
}
