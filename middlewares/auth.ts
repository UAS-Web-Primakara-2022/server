import { Response, NextFunction } from "express";
import { decodeToken } from "../helpers/jwt";
import { IRequest, TokenData } from "../interface/CustomInterface";

function authentication(req: IRequest, res: Response, next: NextFunction) {
  if (req.headers.authorization) {
    req.loggedUser = decodeToken(req.headers.authorization) as TokenData;
    next();
  } else {
    res.status(401).json({ message: "Unauthorized login" });
  }
}

function adminAuthorization(req: IRequest, res: Response, next: NextFunction) {
  if (req.loggedUser?.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden access" });
  }
}

export { authentication, adminAuthorization };
