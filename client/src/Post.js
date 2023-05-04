import {format} from 'date-fns'
import pl from 'date-fns/locale/pl';
import { Link } from "react-router-dom";

export default function Post({_id, title, summary, image, content, createdAt, author}){
    return(
      <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={'http://localhost:4000/' + image} alt="" />
          </Link>
        </div>
        <div className="texts">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p className="info">
            <a className="author">{author.username}</a>
            <time>{format(new Date(createdAt),'d MMMM yyyy, HH:mm:ss', {locale: pl})}</time>
          </p>
          <p className="summary">{summary}</p>
        </div>
      </div>
    );
}