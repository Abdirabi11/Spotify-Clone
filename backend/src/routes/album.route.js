import express from 'express'
import { getAllAlbums, getALbumById } from '../controllers/album.controller.js'
const router= express.Router()

router.get('/', getAllAlbums)
router.get('/:albumId', getALbumById)


export default router