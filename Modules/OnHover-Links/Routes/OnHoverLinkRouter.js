import express from "express";
import { AddLink, DeleteLink, FindSubNavOnHover, UpdateLink,  ViewAllLinks } from "../services/OnHoverLinkServices.js";
import { handleFileUpload, uploadService } from "../../Upload/ServiceUpload.js";

export const OnHoverLink=express.Router();

OnHoverLink.get('/view',ViewAllLinks);
OnHoverLink.get('/view/:id',FindSubNavOnHover);
OnHoverLink.post('/add',AddLink);
OnHoverLink.put('/update/:id',UpdateLink);
OnHoverLink.delete('/delete/:id',DeleteLink);

OnHoverLink.post('/service/img/upload', uploadService.fields([
    { name: 'BannerIMG', maxCount: 1 },
    { name: 'ServiceIMG', maxCount: 1 },
  ]),
  handleFileUpload)
