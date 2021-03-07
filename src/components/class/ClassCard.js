import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useLanguage } from "../../provider/LanguageProvider";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
});

function ClassCard({ name, img, description, poem }) {
  const classes = useStyles();
  const { texts, language } = useLanguage();
  return (
    <div className="classCard">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={img}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {texts["class"][name][language]}
            </Typography>
            <div className="class__poem overflow">
              {poem &&
                poem.split(".").map((e) => (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {e}
                  </Typography>
                ))}
            </div>
            <div className="class__description overflow">
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default ClassCard;
